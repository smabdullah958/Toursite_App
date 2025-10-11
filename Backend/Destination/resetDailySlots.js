// const DestinationDatabase = require("../Models/DestinationDataBase"); // Destination model

// const cron = require('node-cron');

// async function resetDailySlots() {
// //     try {
// //         // Update all documents in the DestinationDatabase
// //         // For every document, go through all BookingOption elements
// //         // and set the current 'Slots' back to 'OriginalSlots'.
        
// //                        const result = await DestinationDatabase.updateMany(
// //             {}, // Filter: all documents
// //             [
// //                 { 
// //                     $set: { 
// //                         "BookingOption": {
// //                             $map: {
// //                                 input: "$BookingOption", // Iterate over the BookingOption array
// //                                 as: "option",
// //                                 in: {
// //                                     $mergeObjects: [
// //                                         "$$option", // Keep all existing fields (Category, Duration, etc.)
// //                                         { "Slots": "$$option.OriginalSlots" } // OVERWRITE Slots with the value from OriginalSlots
// //                                     ]
// //                                 }
// //                             }
// //                         }
// //                     }
// //                 }
// //             ]
// //         );

// //         console.log(`Slots reset complete! ${result.nModified} destinations updated.`);
// //     } catch (error) {
// //         console.error("Error resetting daily slots:", error);
// //     }
// // }

//   try {
//     const todayDate = new Date().toISOString().split("T")[0];
//     const destinations = await DestinationDatabase.find();

//     for (const destination of destinations) {
//       let isModified = false;

//                   // ✅ Check if BookingOption exists
//             if (!destination.BookingOption || destination.BookingOption.length === 0) {
//                 console.log(`⚠️ ${destination.Title} has no BookingOption`);
//             return ;
//             }


//       destination.BookingOption.forEach(option => {
//         // check if today already exists
//         const todaySlot = option.SlotByDate.find(s => s.Date === todayDate);

//         if (!todaySlot) {
//           // add today’s slot with full capacity
//           option.SlotByDate.push({
//             Date: todayDate,
//             RemainingSlots: option.Slots,
//           });
//           isModified = true;
//         }
//       });

//       if (isModified) {
//         await destination.save();
//       }
//     }

//     console.log("✅ Daily slots reset completed for", todayDate);
//   } catch (error) {
//     console.error("❌ Error in ResetDailySlots:", error);
//   }
// };


// // How to schedule this (using node-cron as an example):

// // Schedule the job to run every day at 12:00 AM (midnight)
// ResetDestinationDailySlots = () => {
// cron.schedule('39 13 * * *', () => {
//   console.log('Running daily slot reset job...');
//   resetDailySlots();
// }, {
//   timezone: "Asia/Karachi" // Set to your server/target timezone (e.g., UAE for AED currency)
// })
// };

// module.exports=ResetDestinationDailySlots;








const DestinationDatabase = require("../Models/DestinationDataBase");
const cron = require('node-cron');

async function resetDailySlots() {
    try {
        console.log("🔄 Starting daily slot reset...");
        
        const todayDate = new Date().toISOString().split("T")[0];
        console.log(`📅 Today's date: ${todayDate}`);
        
        const destinations = await DestinationDatabase.find();
        
        if (!destinations || destinations.length === 0) {
            console.log("⚠️ No destinations found");
            return;
        }

        let updatedCount = 0;

        for (const destination of destinations) {
            let isModified = false;

            // ✅ Check if BookingOption exists
            if (!destination.BookingOption || destination.BookingOption.length === 0) {
                console.log(`⚠️ ${destination.Title} has no BookingOption`);
                continue;
            }

            destination.BookingOption.forEach(option => {
                // ✅ Initialize SlotByDate if it doesn't exist
                if (!option.SlotByDate) {
                    option.SlotByDate = [];
                    isModified = true;
                    console.log(`🔧 Initialized SlotByDate for ${destination.Title} - ${option.Category}`);
                }

                // ✅ Check if today already exists in SlotByDate
                const todaySlot = option.SlotByDate.find(s => s.Date === todayDate);

                if (!todaySlot) {
                    // ✅ Add today's slot with current Slots value
                    option.SlotByDate.push({
                        Date: todayDate,
                        RemainingSlots: option.Slots || option.OriginalSlots || 0
                    });
                    isModified = true;
                    console.log(`✅ Added today's slot for ${destination.Title} - ${option.Category}: ${option.Slots} slots`);
                }
            });

            if (isModified) {
                await destination.save();
                updatedCount++;
                console.log(`💾 Saved: ${destination.Title}`);
            }
        }

        console.log(`\n✅ Daily slots reset completed for ${todayDate}`);
        console.log(`📊 Updated ${updatedCount} destinations`);

    } catch (error) {
        console.error("❌ Error in ResetDailySlots:", error);
        console.error("Stack trace:", error.stack);
    }
}

// Schedule to run at 1:31 PM (your current time for testing)
const ResetDestinationDailySlots = () => {
    cron.schedule('0 0 * * *', () => {
       console.log('⏰ Running daily slot reset job...');
        resetDailySlots();
    }, {
        timezone: "Asia/Karachi"
    });
    
    console.log("✅ Cron job scheduled: Daily reset at 13:31 (Asia/Karachi)");
    console.log("⏰ Next run: Today at 1:31 PM or tomorrow");
};

module.exports = ResetDestinationDailySlots;
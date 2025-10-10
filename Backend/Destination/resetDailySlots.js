const DestinationDatabase = require("../Models/DestinationDataBase"); // Destination model

const cron = require('node-cron');

async function resetDailySlots() {
    try {
        // Update all documents in the DestinationDatabase
        // For every document, go through all BookingOption elements
        // and set the current 'Slots' back to 'OriginalSlots'.
        
                       const result = await DestinationDatabase.updateMany(
            {}, // Filter: all documents
            [
                { 
                    $set: { 
                        "BookingOption": {
                            $map: {
                                input: "$BookingOption", // Iterate over the BookingOption array
                                as: "option",
                                in: {
                                    $mergeObjects: [
                                        "$$option", // Keep all existing fields (Category, Duration, etc.)
                                        { "Slots": "$$option.OriginalSlots" } // OVERWRITE Slots with the value from OriginalSlots
                                    ]
                                }
                            }
                        }
                    }
                }
            ]
        );

        console.log(`Slots reset complete! ${result.nModified} destinations updated.`);
    } catch (error) {
        console.error("Error resetting daily slots:", error);
    }
}

// How to schedule this (using node-cron as an example):

// Schedule the job to run every day at 12:00 AM (midnight)
ResetDestinationDailySlots = () => {
cron.schedule('0 0 * * *', () => {
  console.log('Running daily slot reset job...');
  resetDailySlots();
}, {
  timezone: "Asia/Karachi" // Set to your server/target timezone (e.g., UAE for AED currency)
})
};

module.exports=ResetDestinationDailySlots;
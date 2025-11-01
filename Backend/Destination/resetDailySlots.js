// const DestinationDatabase = require("../Models/DestinationDataBase");
// const cron = require("node-cron");
// const GetDubaiDate = require("../DubaiTimeZone");

// async function resetDailySlots() {
//   try {
//     const today = GetDubaiDate();
//     console.log(`📅 Running daily slot reset for Dubai date: ${today}`);

//     const destinations = await DestinationDatabase.find();

//     if (!destinations || destinations.length === 0) {
//       console.log("⚠️ No destinations found.");
//       return;
//     }

//     for (const dest of destinations) {
//       let isModified = false;

//       dest.BookingOption.forEach((opt) => {
//         // ✅ Skip if no OriginalSlots
//         if (!opt.OriginalSlots) {
//           console.log(`⚠️ Skipping ${dest.Title} - Missing OriginalSlots`);
//           return;
//         }

//         const todaySlot = opt.SlotByDate?.find((s) => s.Date === today);

//         if (todaySlot) {
//           //  Copy that RemainingSlots into global Slots
//           console.log(
//             `🔁 ${dest.Title} - ${opt.Category}: Using today's SlotByDate (${todaySlot.RemainingSlots})`
//           );
//           opt.Slots = todaySlot.RemainingSlots;
//           isModified = true;
//         } else {
//           // ✅ If no record for today → reset to OriginalSlots
//           console.log(
//             `🌅 ${dest.Title} - ${opt.Category}: No SlotByDate entry found, reset to OriginalSlots (${opt.OriginalSlots})`
//           );
//           opt.Slots = opt.OriginalSlots;
//           isModified = true;
//         }
//       });

//       if (isModified) {
//         await dest.save();
//         console.log(`✅ Updated slots for ${dest.Title}`);
//       }
//     }

//     console.log("🎯 Daily slot reset completed successfully ✅");
//   } catch (error) {
//     console.error("❌ Error in resetDailySlots:", error);
//   }
// }

// const ResetDestinationDailySlots = () => {
//   cron.schedule(
//     "0 0 * * *", // every midnight Dubai time
//     async () => {
//       console.log("⏰ Running daily slot reset job...");
//       await resetDailySlots();
//     },
//     {
//       timezone: "Asia/Dubai",
//     }
//   );

//   console.log("✅ Cron job scheduled: Daily reset at 00:00 (Asia/Dubai)");
// };

// module.exports = ResetDestinationDailySlots;






const DestinationDatabase = require("../Models/DestinationDataBase");
const cron = require("node-cron");
const GetDubaiDate = require("../DubaiTimeZone");

async function resetDailySlots() {
  try {
    const today = GetDubaiDate();
    const destinations = await DestinationDatabase.find();

    if (!destinations || destinations.length === 0) {
      console.log("⚠️ No destinations found.");
      return;
    }

    let totalUpdated = 0;

    for (const dest of destinations) {
      let isModified = false;

      dest.BookingOption.forEach((opt, index) => {
        // Skip if no OriginalSlots
        if (!opt.OriginalSlots) {
          console.log(`  ⚠️ Option ${index + 1}: Missing OriginalSlots - SKIPPED`);
          return;
        }


        const todaySlot = opt.SlotByDate?.find((s) => s.Date === today);

        if (todaySlot) {
          // Copy RemainingSlots into Slots
          
          opt.Slots = todaySlot.RemainingSlots;
          isModified = true;
        } else {
          // No record for today → reset to OriginalSlots
          console.log(`     ℹ️ No SlotByDate entry for today`);
          console.log(`     🔄 Resetting Slots: ${opt.Slots} → ${opt.OriginalSlots}`);
          
          opt.Slots = opt.OriginalSlots;
          isModified = true;
        }
      });

      if (isModified) {
        await dest.save();
        totalUpdated++;
        console.log(`  ✅ Saved changes for: ${dest.Title}`);
      } else {
        console.log(`  ℹ️ No changes needed for: ${dest.Title}`);
      }
    }


  } catch (error) {
    console.error("\n❌ ERROR in resetDailySlots:", error);
    console.error("Stack trace:", error.stack);
  }
}

const ResetDestinationDailySlots = () => {
  //  Schedule for midnight Dubai time
  cron.schedule("0 0 * * *", async () => {
    console.log("\n⏰ Cron job triggered at midnight Dubai time");
    await resetDailySlots();
  }, {
    timezone: "Asia/Dubai",
  });

  console.log("✅ Cron job scheduled: Daily reset at 00:00 (Asia/Dubai)");
  console.log("ℹ️ Next run will be at midnight Dubai time\n");
};

// Export both for flexibility
module.exports = ResetDestinationDailySlots;
module.exports.resetDailySlots = resetDailySlots; // For manual testing
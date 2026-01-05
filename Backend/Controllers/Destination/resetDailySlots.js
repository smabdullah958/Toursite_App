 const DestinationDatabase = require("../../Models/DestinationDataBase");
 const cron = require("node-cron");
 const GetDubaiDate = require("../../DubaiTimeZone");

async function resetDailySlots() {
  try {
    const today = GetDubaiDate();
    console.log(`📅 Running daily slot reset for Dubai date: ${today}`);

    const destinations = await DestinationDatabase.find();

    for (const dest of destinations) {
      let isModified = false;

      dest.BookingOption.forEach((opt) => {

        if (opt.SlotByDate && opt.SlotByDate.length > 0) {
          const todaySlot = opt.SlotByDate.find((s) => s.Date === today);

          if (todaySlot) {
            // copy today's RemainingSlots → Slots
            opt.Slots = todaySlot.RemainingSlots;
            isModified = true;
          } else {
            // if no entry for today → reset to OriginalSlots
            opt.Slots = opt.OriginalSlots;
            isModified = true;
          }
        } else {
          // no SlotByDate at all → reset to OriginalSlots
          opt.Slots = opt.OriginalSlots;
          isModified = true;
        }
      });

      if (isModified) {
        await dest.save();
        console.log(`✅ Updated slots for ${dest.Title}`);
      }
    }

    console.log("🎯 Daily slot reset completed successfully.");
  } catch (error) {
    console.error("❌ Error in resetDailySlots:", error);
  }
}


 const ResetDestinationDailySlots = () => {
   cron.schedule(
     "0 0 * * *", // every midnight Dubai time
     async () => {
       console.log("⏰ Running daily slot reset job...");
      await resetDailySlots();
     },
     {
       timezone: "Asia/Dubai",
     }
   );

   console.log("✅ Cron job scheduled: Daily reset at 00:00 (Asia/Dubai)");
 };

 module.exports = ResetDestinationDailySlots;



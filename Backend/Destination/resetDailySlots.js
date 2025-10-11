const DestinationDatabase = require("../Models/DestinationDataBase");
const cron = require("node-cron");
const GetDubaiDate = require("../DubaiTimeZone");

async function resetDailySlots() {
  try {
    const today = GetDubaiDate();
    console.log(`📅 Running daily slot reset for Dubai date: ${today}`);

    const destinations = await DestinationDatabase.find();

    if (!destinations || destinations.length === 0) {
      console.log("⚠️ No destinations found.");
      return;
    }

    for (const dest of destinations) {
      let isModified = false;

      dest.BookingOption.forEach((opt) => {
        // ✅ Skip if no OriginalSlots
        if (!opt.OriginalSlots) {
          console.log(`⚠️ Skipping ${dest.Title} - Missing OriginalSlots`);
          return;
        }

        const todaySlot = opt.SlotByDate?.find((s) => s.Date === today);

        if (todaySlot) {
          //  Copy that RemainingSlots into global Slots
          console.log(
            `🔁 ${dest.Title} - ${opt.Category}: Using today's SlotByDate (${todaySlot.RemainingSlots})`
          );
          opt.Slots = todaySlot.RemainingSlots;
          isModified = true;
        } else {
          // ✅ If no record for today → reset to OriginalSlots
          console.log(
            `🌅 ${dest.Title} - ${opt.Category}: No SlotByDate entry found, reset to OriginalSlots (${opt.OriginalSlots})`
          );
          opt.Slots = opt.OriginalSlots;
          isModified = true;
        }
      });

      if (isModified) {
        await dest.save();
        console.log(`✅ Updated slots for ${dest.Title}`);
      }
    }

    console.log("🎯 Daily slot reset completed successfully ✅");
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

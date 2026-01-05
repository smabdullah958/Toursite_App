const PackageDatabase = require("../../Models/PackagesDatabase");
const cron = require("node-cron");
const GetDubaiDate = require("../../DubaiTimeZone");

async function resetDailyPackageSlots() {
  try {
    const today = GetDubaiDate();
    console.log(`📅 Running daily package slot reset for Dubai date: ${today}`);

    const packages = await PackageDatabase.find();

    for (const pkg of packages) {
      let isModified = false;

      pkg.BookingOption.forEach((opt) => {

        if (opt.SlotByDate && opt.SlotByDate.length > 0) {
          const todaySlot = opt.SlotByDate.find((s) => s.Date === today);

          if (todaySlot) {
            // today's remaining slots → assign to Slots
            opt.Slots = todaySlot.RemainingSlots;
            isModified = true;
          } else {
            // reset to original slots
            opt.Slots = opt.OriginalSlots;
            isModified = true;
          }
        } else {
          // No SlotByDate array → reset to original
          opt.Slots = opt.OriginalSlots;
          isModified = true;
        }
      });

      if (isModified) {
        await pkg.save();
        console.log(`✅ Updated package slots for: ${pkg.Title}`);
      }
    }

    console.log("🎯 Daily package slot reset completed.");
  } catch (err) {
    console.error("❌ Error resetting package slots:", err);
  }
}


function ResetPackageDailySlots() {
  cron.schedule(
    "0 0 * * *",
    async () => {
      console.log("🕛 Running daily slot reset job...");
      await resetDailyPackageSlots();
    },
    {
      timezone: "Asia/Dubai",
    }
  );
}

module.exports = ResetPackageDailySlots;

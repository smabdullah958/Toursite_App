const PackageDatabase = require("../Models/PackagesDatabase"); // Destination model

const cron = require('node-cron');
const GetDubaiDate = require("../DubaiTimeZone");
async function resetDailySlots() {
  try {
    const today = GetDubaiDate();
    console.log(`📅 Running daily slot reset for Dubai date: ${today}`);

    const packages = await PackageDatabase.find();

    if (!packages || packages.length === 0) {
      console.log("⚠️ No packages found.");
      return;
    }

    for (const dest of packages) {
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


// Schedule the job to run every day at 12:00 AM (midnight)
ResetPackageDailySlots = () => {
cron.schedule('0 0 * * *', async() => {
  console.log('Running daily slot reset job...');
 await resetDailySlots();
}, {
  timezone: "Asia/Dubai" // Set to your server/target timezone (e.g., UAE for AED currency)
})
};

module.exports=ResetPackageDailySlots;
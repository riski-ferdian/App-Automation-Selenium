import assert from "node:assert/strict";
import fs from "node:fs";
import { createDriver } from "../../src/utils/driver.js";
import LoginScreen from "../../src/screens/actions/LoginScreen.js";

const userData = JSON.parse(
  fs.readFileSync("./src/data/userData.json", "utf-8"),
);

(async () => {
  let driver;

  try {
    console.log("Membuka sesi Appium & menginstal aplikasi di Emulator...");
    driver = await createDriver();
    const loginScreen = new LoginScreen(driver);

    console.log("Navigasi ke halaman Login...");
    await loginScreen.openLoginForm();

    console.log("Memasukkan kredensial valid...");
    await loginScreen.login(
      userData.validUser.username,
      userData.validUser.password,
    );

    console.log("Memvalidasi halaman katalog produk...");
    const actualTitle = await loginScreen.getCatalogTitle();
    assert.strictEqual(
      actualTitle,
      "Products",
      "Judul halaman tidak sesuai setelah login!",
    );

    console.log("✅ Test Mobile Login Berhasil!");
  } catch (error) {
    console.error("❌ Test Mobile Gagal:", error.message);
    process.exitCode = 1;
  } finally {
    if (driver) {
      await driver.quit();
      console.log("Sesi Appium ditutup.");
    }
  }
})();

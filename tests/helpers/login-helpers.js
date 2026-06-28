import { loginLocators } from "../locators/login-locators";
import { testData } from "../data/test-data";


export async function performLogin(page) {
    
    await page.goto(testData.loginUrl);

    await page.fill(loginLocators.campoEmail, testData.validEmail);

    await page.fill(loginLocators.campoSenha, testData.validPassword);

    await page.waitForTimeout(2000);

    await page.click(loginLocators.botaoLogin);
}
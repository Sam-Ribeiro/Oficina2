import { commonLocators } from "../locators/common-locators";
import { expect } from "@playwright/test";

export async function CadastrarVoluntario(page) {

    await page.click(commonLocators.tabVoluntario)

    await page.click(commonLocators.botaoAdicionar)

    const codigoGerado = Date.now();

    await page.fill(commonLocators.inputNome, `Voluntario ${codigoGerado}`);
    await page.waitForTimeout(1000);

    await page.fill(commonLocators.inputEmail, `Voluntario${codigoGerado}@email.com`);
    await page.waitForTimeout(1000);

    await page.fill(commonLocators.inputIdade, '25');
    await page.waitForTimeout(1000);

    await page.fill(commonLocators.inputCpf, '12345678901');
    await page.waitForTimeout(1000);

    await page.fill(commonLocators.inputRa, '123453');
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoSalvar)

    await expect(page.getByText('Voluntario cadastrado com sucesso!')).toBeVisible();
    await page.waitForTimeout(1000);
}

export async function DeletarVoluntario(page) {
    await page.click(commonLocators.primeiroItemCheckbox)
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoDelete)
    
    await page.waitForTimeout(1000);
}

export async function EditarVoluntario(page) {
    await page.click(commonLocators.primeiroItemCheckbox)
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoEdit)
    
    await page.waitForTimeout(1000);

    await page.fill(commonLocators.inputNome, `Editado`);
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoSalvar)
    await page.waitForTimeout(1000);
}
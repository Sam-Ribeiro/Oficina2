import { commonLocators } from "../locators/common-locators";
import { expect } from "@playwright/test";

export async function CadastrarOficina(page) {

    await page.click(commonLocators.tabOficina)

    await page.click(commonLocators.botaoAdicionar)

    const codigoGerado = Date.now();

    await page.fill(commonLocators.inputNome, `Oficina - ${codigoGerado}`);
    await page.waitForTimeout(1000);

    await page.fill(commonLocators.inputDescricao, `descricao da oficina teste`);
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoSalvar)

    await page.waitForTimeout(2000);
}

export async function DeletarOficina(page) {
    await page.click(commonLocators.primeiroItemCheckbox)
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoDelete)
    
    await page.waitForTimeout(1000);
}

export async function EditarOficina(page) {
    await page.click(commonLocators.primeiroItemCheckbox)
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoEdit)
    
    await page.waitForTimeout(1000);

    await page.fill(commonLocators.inputNome, `Editado`);
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoSalvar)
    await page.waitForTimeout(1000);
}
import { commonLocators } from "../locators/common-locators";
import { expect } from "@playwright/test";

export async function CadastrarTurma(page) {

    await page.click(commonLocators.tabTurma)

    await page.click(commonLocators.botaoAdicionar)
    await page.waitForTimeout(1000);

    await page.click(commonLocators.inputOficina)
    await page.waitForTimeout(1000);
    await page.click(commonLocators.primeiraOpcao)
    await page.waitForTimeout(1000);

    await page.click(commonLocators.inputVoluntario)
    await page.waitForTimeout(1000);
    await page.click(commonLocators.primeiraOpcao)
    await page.waitForTimeout(1000);

    await page.click(commonLocators.inputAlunos)
    await page.waitForTimeout(1000);
    await page.click(commonLocators.primeiraOpcao)
    await page.waitForTimeout(1000);

    await page.fill(commonLocators.startDate, "2026-05-26")
    await page.waitForTimeout(1000);

    await page.fill(commonLocators.endDate, "2026-12-10")
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoSalvar)

    await page.waitForTimeout(2000);
}

export async function DeletarTurma(page) {
    await page.click(commonLocators.primeiroItemCheckbox)
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoDelete)
    
    await page.waitForTimeout(1000);
}

export async function EditarTurma(page) {
    await page.click(commonLocators.primeiroItemCheckbox)
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoEdit)
    
    await page.waitForTimeout(1000);

    await page.click(commonLocators.inputAlunos)
    await page.waitForTimeout(1000);
    await page.click(commonLocators.primeiraOpcao)
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoSalvar)
    await page.waitForTimeout(1000);
}
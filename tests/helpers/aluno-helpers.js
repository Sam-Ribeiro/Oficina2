import { commonLocators } from "../locators/common-locators";
import { expect } from "@playwright/test";

export async function CadastrarAluno(page) {

    await page.click(commonLocators.tabAluno)

    await page.click(commonLocators.botaoAdicionar)

    const codigoGerado = Date.now();

    await page.fill(commonLocators.inputNome, `Teste ${codigoGerado}`);
    await page.waitForTimeout(1000);

    await page.fill(commonLocators.inputEmail, `teste${codigoGerado}@email.com`);
    await page.waitForTimeout(1000);

    await page.fill(commonLocators.inputIdade, '25');
    await page.waitForTimeout(1000);

    await page.fill(commonLocators.inputCpf, '12345678901');
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoSalvar)

    await expect(page.getByText('Aluno cadastrado com sucesso!')).toBeVisible();
    await page.waitForTimeout(1000);
}

export async function DeletarAluno(page) {
    await page.click(commonLocators.primeiroItemCheckbox)
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoDelete)
    
    await page.waitForTimeout(1000);
}

export async function EditarAluno(page) {
    await page.click(commonLocators.primeiroItemCheckbox)
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoEdit)
    
    await page.waitForTimeout(1000);

    await page.fill(commonLocators.inputNome, ` - Editado`);
    await page.waitForTimeout(1000);

    await page.click(commonLocators.botaoSalvar)
    await page.waitForTimeout(1000);
}
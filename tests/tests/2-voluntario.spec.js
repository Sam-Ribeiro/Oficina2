import { test } from "../fixtures/login-fixture";
import { CadastrarVoluntario, EditarVoluntario, DeletarVoluntario } from "../helpers/voluntario-helpers";

test(
    'CT01 - Cadastrar voluntario com sucesso',
    async ({ loggedPage }) => {
        await CadastrarVoluntario(loggedPage)
    }
);

test(
    'CT02 - Editar voluntario com sucesso',
    async ({ loggedPage }) => {
        await CadastrarVoluntario(loggedPage)
        await EditarVoluntario(loggedPage)
    }
);

test(
    'CT03 - Deletar voluntario com sucesso',
    async ({ loggedPage }) => {
        await CadastrarVoluntario(loggedPage)
        await DeletarVoluntario(loggedPage)
    }
);
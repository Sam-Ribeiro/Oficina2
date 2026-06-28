import { test } from "../fixtures/login-fixture";
import { CadastrarOficina, EditarOficina, DeletarOficina } from "../helpers/oficina-helpers";

test(
    'CT01 - Cadastrar oficina com sucesso',
    async ({ loggedPage }) => {
        await CadastrarOficina(loggedPage)
    }
);

test(
    'CT02 - Editar oficina com sucesso',
    async ({ loggedPage }) => {
        await CadastrarOficina(loggedPage)
        await EditarOficina(loggedPage)
    }
);

test(
    'CT03 - Deletar oficina com sucesso',
    async ({ loggedPage }) => {
        await CadastrarOficina(loggedPage)
        await DeletarOficina(loggedPage)
    }
);
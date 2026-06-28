import { test } from "../fixtures/login-fixture";
import { CadastrarTurma, EditarTurma, DeletarTurma } from "../helpers/turma-helpers";

test(
    'CT01 - Cadastrar turma com sucesso',
    async ({ loggedPage }) => {
        await CadastrarTurma(loggedPage)
    }
);


test(
    'CT02 - Editar turma com sucesso',
    async ({ loggedPage }) => {
        await CadastrarTurma(loggedPage)
        await EditarTurma(loggedPage)
    }
);

test(
    'CT03 - Deletar turma com sucesso',
    async ({ loggedPage }) => {
        await CadastrarTurma(loggedPage)
        await DeletarTurma(loggedPage)
    }
);
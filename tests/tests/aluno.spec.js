import { test } from "../fixtures/login-fixture";
import { CadastrarAluno, DeletarAluno, EditarAluno } from "../helpers/aluno-helpers";

test(
    'CT01 - Cadastrar aluno com sucesso',
    async ({ loggedPage }) => {
        await CadastrarAluno(loggedPage)
    }
);

test(
    'CT02 - Editar aluno com sucesso',
    async ({ loggedPage }) => {
        await CadastrarAluno(loggedPage)
        await EditarAluno(loggedPage)
    }
);

test(
    'CT03 - Deletar aluno com sucesso',
    async ({ loggedPage }) => {
        await CadastrarAluno(loggedPage)
        await DeletarAluno(loggedPage)
    }
);
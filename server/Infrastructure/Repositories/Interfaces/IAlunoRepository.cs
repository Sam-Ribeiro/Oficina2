using server.Models;

namespace server.Infrastructure.Repositories.Interfaces
{
    public interface IAlunoRepository
    {
        Aluno? GetAlunoById(int id);
        List<Aluno>? GetAlunos();
        void AddAluno(Aluno aluno);
        void UpdateAluno(Aluno aluno, int id);
        void DeleteAluno(int id);
    }
}

using server.Models;
using System.Collections.Generic;

namespace server.Infrastructure.Repositories.Interfaces
{
    public interface ITurmaRepository
    {
        void AddTurma(Turma turma);
        List<Turma> GetTurmas();
    }
}
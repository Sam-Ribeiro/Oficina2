using server.Models;
using System.Collections.Generic;

namespace server.Infrastructure.Repositories.Interfaces
{
    public interface IAulaRepository
    {
        void AddAula(Aula aula);
        List<Aula> GetAulas();
    }
}
using server.Models;
using System.Collections.Generic;

namespace server.Infrastructure.Repositories.Interfaces
{
    public interface IPresencaRepository
    {
        void AddPresenca(Presenca presenca);
        List<Presenca> GetPresencas();
    }
}
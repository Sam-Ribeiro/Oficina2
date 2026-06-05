using server.Models;
using System.Collections.Generic;

namespace server.Infrastructure.Repositories.Interfaces
{
    public interface IOficinaRepository
    {
        void AddOficina(Oficina oficina);
        List<Oficina> GetOficinas();
    }
}
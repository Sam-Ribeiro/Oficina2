using server.Models;
using System.Collections.Generic;

namespace server.Infrastructure.Repositories.Interfaces
{
    public interface IVoluntarioRepository
    {
        void AddVoluntario(Voluntario voluntario);
        void DeleteVoluntario(int id);
        Voluntario GetVoluntarioById(int id);
        List<Voluntario> GetVoluntarios();
        void UpdateVoluntario(Voluntario updatedVoluntario, int id);
    }
}
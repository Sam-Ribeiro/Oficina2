using server.Models;
using System.Collections.Generic;

namespace server.Infrastructure.Repositories.Interfaces
{
    public interface IVoluntarioRepository
    {
        void AddVoluntario(Voluntario voluntario);
        List<Voluntario> GetVoluntarios();

        // Os 3 métodos novos para completar o CRUD:
        Voluntario GetVoluntarioById(int id);
        void UpdateVoluntario(Voluntario updatedVoluntario, int id);
        void DeleteVoluntario(int id);
    }
}
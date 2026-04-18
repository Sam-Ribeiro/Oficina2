using Microsoft.AspNetCore.WebUtilities;
using server.Models;
using System.Text.Json;

namespace server.Infrastructure.Data
{
    public class InMemoryContext
    {
        public List<Aluno> alunos { get; set; }

        public void SaveChanges()
        {
            string jsonAlunos = JsonSerializer.Serialize(alunos);
            File.WriteAllText("alunos.json", jsonAlunos);
        }

        public void LoadContexts() 
        {
            var jsonAlunos = File.ReadAllText("alunos.json");
            try
            {
                alunos = JsonSerializer.Deserialize<List<Aluno>>(jsonAlunos);
            }
            catch (Exception ex)
            {
                alunos = new List<Aluno>();
            }
        }
    }
}

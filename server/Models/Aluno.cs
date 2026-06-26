using System.Collections.Generic;

namespace server.Models
{
    public class Aluno : Pessoa
    {
        
        public List<Turma> Turmas { get; set; } = new List<Turma>();
    }
}
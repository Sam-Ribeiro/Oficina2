namespace server.Models
{
    public class Presenca
    {
        public int Id { get; set; }
        public bool Presente { get; set; }

        public int AulaId { get; set; }
        public Aula Aula { get; set; }

        public int AlunoId { get; set; }
        public Aluno Aluno { get; set; }
    }
}
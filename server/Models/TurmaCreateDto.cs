namespace server.Models
{
    public class TurmaCreateDto
    {
        public int Id { get; set; }
        public DateTime DataInicio { get; set; }
        public DateTime DataTermino { get; set; }
        public string Status { get; set; }
        public int OficinaId { get; set; }
        public int VoluntarioId { get; set; }
        public List<int> AlunosIds { get; set; } = new List<int>();
    }
}
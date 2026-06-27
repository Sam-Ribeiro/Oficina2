using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System;

namespace server.Services
{
    public class CertificadoService
    {
        public byte[] GerarCertificado(string nomeAluno, string nomeOficina, DateTime dataInicio, DateTime dataFim, int cargaHoraria, string codigoAutenticidade)
        {
            return Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4.Landscape());
                    page.Margin(0);
                    page.PageColor(Colors.White);

                    page.Background().Row(row =>
                    {
                        row.ConstantItem(60).Background("#FFCC00");
                        row.RelativeItem();
                    });

                    page.Content().PaddingLeft(80).PaddingRight(20).PaddingTop(20).Column(col =>
                    {
                        col.Item().AlignCenter().Width(70).Image("images/brasao.png");
                        col.Item().AlignCenter().Text("República Federativa do Brasil\nMinistério da Educação\nUniversidade Tecnológica Federal do Paraná").FontSize(11).Bold();

                        col.Item().PaddingTop(30).AlignCenter().Text("CERTIFICADO").FontSize(32).Bold();

                        col.Item().PaddingTop(20).PaddingHorizontal(40).Text(text =>
                        {
                            text.Justify();
                            text.Span("Certificamos que ").FontSize(14);
                            text.Span(nomeAluno.ToUpper()).FontSize(14).Bold();
                            text.Span(" participou como aluno do ").FontSize(14);
                            text.Span("Projeto de Extensão: \"").FontSize(14).Bold();
                            text.Span(nomeOficina).FontSize(14).Bold();
                            text.Span("\", promovido pela ").FontSize(14);
                            text.Span("Universidade Tecnológica Federal do Paraná - Campus Cornélio Procópio").FontSize(14).Bold();
                            text.Span($", de {dataInicio:dd/MM/yyyy} a {dataFim:dd/MM/yyyy}, com carga horária de ").FontSize(14);
                            text.Span($"{cargaHoraria} horas").FontSize(14).Bold();
                            text.Span(".").FontSize(14);
                        });

                        col.Item().PaddingTop(20).AlignCenter().Text($"Cornélio Procópio, {DateTime.Now:dd 'de' MMMM 'de' yyyy}.").FontSize(14);

                        col.Item().PaddingTop(40).AlignCenter().Text("Diretoria de Relações Empresariais e Comunitárias\nCampus Cornélio Procópio").FontSize(14).Bold();
                    });

                    page.Footer().PaddingLeft(80).PaddingBottom(20).Row(row =>
                    {
                        row.ConstantItem(100).Height(50).Image("images/utfpr.png");
                        row.RelativeItem().AlignCenter().Text(text =>
                        {
                            text.Span("a autenticidade deste documento pode ser verificada através da URL:\n").FontSize(9);
                            text.Span($"http://apl.utfpr.edu.br/extensao/validar/{codigoAutenticidade}").FontSize(9);
                        });
                        row.ConstantItem(100);
                    });
                });
            }).GeneratePdf();
        }
    }
}
using Microsoft.AspNetCore.Http;
using System.Text;

namespace BLL.Reader
{
    public static class FileReader
    {
        public static List<string> ReadAsList(this IFormFile file)
        {
            var list = new List<string>();
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                while (reader.Peek() >= 0)
                {
                    var temp = new StringBuilder();
                    temp.AppendLine(reader.ReadLine());
                    list.Add(temp.ToString());
                }
            }
            return list;
        }
    }
}

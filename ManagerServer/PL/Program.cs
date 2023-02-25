using BLL.Converter;
using BLL.Services;
using BLL.Services.Contracts;
using BLL.Validators;
using DAL.Context;
using DAL.Models;
using DAL.Repository;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using PL.Extensions;
using PL.Middlewares;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.MapType<DateOnly>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "date",
        Example = new OpenApiString("dd.MM.yyyy")
    });
});

builder.Services.AddDbContext<ContactManagerDbContext>
(o => o.UseInMemoryDatabase("ContactsDb"));
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCORS", builder =>
    {
        builder.AllowAnyOrigin().
        AllowAnyHeader().
        AllowAnyMethod();
    });
});

builder.Services.AddValidatorsFromAssemblyContaining<ContactValidator>();

builder.Services.AddScoped<IRepository<UserContact>, Repository<UserContact>>();
builder.Services.AddScoped<IContactService, ContactService>();

var app = builder.Build();

app.SeedData();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<ExceptionHandlerMiddleware>();

app.UseHttpsRedirection();

app.UseCors("MyCORS");
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.Run();

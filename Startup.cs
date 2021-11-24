using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using scapegoat.DataAccess;
using System.Text.Json.Serialization;
using Microsoft.IdentityModel.Tokens;

namespace scapegoat
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddTransient<OrdersRepository>();
            services.AddTransient<OrderItemsRepository>();
            services.AddTransient<UserRepository>();
            services.AddTransient<ProductRepository>();
            services.AddTransient<PaymentTypeRepository>();
            services.AddTransient<UserRepository>();
           
            services.AddControllers()
                    .AddJsonOptions(opts =>
                    {
                        var enumConverter = new JsonStringEnumConverter();
                        opts.JsonSerializerOptions.Converters.Add(enumConverter);
                    });
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                           .AddJwtBearer(options =>
                           {
                               options.IncludeErrorDetails = true;
                               options.Authority = "https://securetoken.google.com/scapegoat-72a37";
                               options.TokenValidationParameters = new TokenValidationParameters
                               {
                                   ValidateLifetime = true,
                                   ValidateAudience = true,
                                   ValidateIssuer = true,
                                   ValidAudience = "scapegoat-72a37",
                                   ValidIssuer = "https://securetoken.google.com/scapegoat-72a37"
                               };
                           });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "scapegoat", Version = "v1" });
            });
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "scapegoat v1"));
            }
            app.UseCors(cfg => cfg.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            app.UseHttpsRedirection();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

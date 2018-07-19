using System;
using Microsoft.Extensions.Configuration;

namespace App.Config.Extensions{
    public static class ConfigurationExtensions {
        public static bool UseMockups(this IConfiguration config){
            string dbType = config["dbType"];
            return dbType == "none" || dbType == "";
        }
        public static bool UseSqlite(this IConfiguration config){
            string dbType = config["dbType"];
            return dbType == "sqlite";
        }
        public static bool UsePostgre(this IConfiguration config){
            string dbType = config["dbType"];
            return dbType == "postgre";
        }
    }
}
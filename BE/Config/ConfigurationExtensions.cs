using System;
using Microsoft.Extensions.Configuration;

namespace App.Config.Extensions{
    public static class ConfigurationExtensions{
        public static bool UseMockups(this IConfiguration config){
            return config["dbType"] == "none";
        }
    }
}
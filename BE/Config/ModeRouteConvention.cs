using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace App.Config{
    public class ModeRouteConvention : IApplicationModelConvention{
        

        public void Apply(ApplicationModel application){
            var globalPrefix = new AttributeRouteModel(new RouteAttribute("api/"));
            
            application.Controllers?.ToList().ForEach( controller => {
                var routeSelectors = controller.Selectors.Where(x => x.AttributeRouteModel != null);

                //routeSelectors?.ToList().ForEach( sel => Console.WriteLine("sel "+ sel.AttributeRouteModel.Name));
                //Console.WriteLine("---------");
                routeSelectors?.ToList().ForEach( sel => 
                    sel.AttributeRouteModel = 
                        AttributeRouteModel.CombineAttributeRouteModel(globalPrefix, sel.AttributeRouteModel)
                );

            });
            
        }
    }

}
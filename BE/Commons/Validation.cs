using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace App.Commons{
    public static class Validation{
        public static IEnumerable<object> GetErrors(ModelStateDictionary modelState, bool asList = true){

            if(asList){
                var errors = modelState.Values
                    .SelectMany(x => x.Errors.Select(e => e.ErrorMessage) );
                return errors;

            }else{
                var errors = modelState.Select( kvp => new {
                    Name = kvp.Key,
                    Messages = kvp.Value.Errors.Select( err => err.ErrorMessage)
                });
                return errors;

            }
        }
    }

}
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace App.Commons{
    public static class Validation{
        public static IEnumerable<object> GetErrors(ModelStateDictionary modelState){
                var errors = modelState.Values.Select(e => new {
                    RawValue = e.RawValue,
                    Errors = e.Errors.Select(e2 => new {
                        Message = e2.ErrorMessage
                    })
                });
                return errors;
        }
    }

}
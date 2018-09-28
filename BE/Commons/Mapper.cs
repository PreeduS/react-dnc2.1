using System;
using System.Collections.Generic;
using System.Linq;

namespace App.Commons{
    public static class Mapper<T, T2> where T2 : class, new(){          //multiple where

        public static List<T2> Map(List<T> source){         //, T2 target
            List<T2> result = new List<T2>();
            List<string> TargetKeys = typeof(T2).GetProperties().Select( x => x.Name).ToList();

            source.ForEach( sElem => {
                T2 tElem = new T2();

                sElem.GetType().GetProperties().ToList().ForEach( sProp => {
                    string sPropName = sProp.Name;
                    bool hasKey = TargetKeys.Find( key => key == sPropName) != null;
                    if(hasKey){
                        var newValue = sElem.GetType().GetProperty(sPropName).GetValue(sElem);
                        tElem.GetType().GetProperty(sPropName).SetValue(tElem, newValue);

                    }

                });
                result.Add(tElem);
            });

            return result;
        }

    }
}
using System;
using System.Collections.Generic;
using System.Linq;

namespace App.Commons{
    public static class Mapper<T, T2>
        where T : class
        where T2 : class, new(){      

        public static List<T2> Map(List<T> source, Action<T,T2> config = null){      //, T2 target

            List<T2> result = new List<T2>();
            List<string> TargetKeys = typeof(T2).GetProperties().Select( x => x.Name).ToList();

            source.ForEach( sElem => {
                T2 tElem = new T2();
                
                //loop for each properties
                sElem.GetType().GetProperties().ToList().ForEach( sProp => {
                    string sPropName = sProp.Name;
                    bool hasKey = TargetKeys.Find( key => key == sPropName) != null;
                    if(hasKey){
                        string sType = sProp.PropertyType.Name;
                        string tType = tElem.GetType().GetProperty(sPropName).PropertyType.Name;
                        bool sameType = sType.Equals(tType);
                        if(sameType){
                            var newValue = sProp.GetValue(sElem);
                            //var newValue = sElem.GetType().GetProperty(sPropName).GetValue(sElem);
                            tElem.GetType().GetProperty(sPropName).SetValue(tElem, newValue);
                        }

                    }

                });

                //override with user defined
                if(config != null){
                    config(sElem, tElem);
                }


                result.Add(tElem);
            });

            return result;
        }

    }
}
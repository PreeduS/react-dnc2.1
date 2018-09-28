using System;
using System.Collections.Generic;
using System.Linq;
using App.IRepos;
using App.Models;


namespace App.Repos{


    public class ThreadsRepo : Repository<Thread>, IThreadsRepo
    {
        private readonly AppDbContext Context;
        public ThreadsRepo(AppDbContext context) : base(context){
            Context = context;
        }

        public List<Thread> GetThreads() {
            List<Thread> result = Context.Threads.Take(10).ToList();

            //result.Select( x => {
            //List<ThreadViewModel> r2 = 
      
/* 

             Console.WriteLine("____________________________________________________1"  );
              typeof(ThreadViewModel).GetProperties().ToList().ForEach(
                   y => Console.WriteLine(y.GetType().Name + ", "+ y.Name ) 
              );
              Console.WriteLine("Get: " + typeof(ThreadViewModel).GetProperty("test")==null );
              Console.WriteLine("Get2: " +typeof(ThreadViewModel).GetProperty("Idd") );
              Console.WriteLine("Get3: " + typeof(ThreadViewModel).GetProperty("Id") );

              Console.WriteLine("Get4: " + (typeof(ThreadViewModel).GetProperty("Idd") == null));
             
             var zzz = typeof(ThreadViewModel).GetProperty("Id");
             var zzz2 = typeof(ThreadViewModel).GetProperty("Idd");
               
                var obj = new ThreadViewModel();
                 //typeof(ThreadViewModel).GetProperty("Id").SetValue(obj,1);

                 obj.GetType().GetProperty("Id").SetValue(obj,1);

                 Console.WriteLine("obj_____________________ "+ obj.Id);


// .ToList().ForEach( y => Console.WriteLine(y.GetType().Name + ", "+ y.Name )   ) 
            result.ForEach( x => {
                Console.WriteLine("____________________________________________________2"  );
                Console.WriteLine(x.Content + ", " + x.GetType()  );
                x.GetType().GetProperties().ToList().ForEach( y => Console.WriteLine(y.GetType().Name + ", "+ y.Name )   );
                //Console.WriteLine("types : " + x.GetType().GetProperties() );
            });

*/
            return result;
        }
    }

}
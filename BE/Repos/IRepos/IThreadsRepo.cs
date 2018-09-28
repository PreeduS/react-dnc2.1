

using System.Collections.Generic;
using App.Models;

namespace App.IRepos{
    public interface IThreadsRepo : IRepository<Thread>{
        List<Thread> GetThreads();
    }

}
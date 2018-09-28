using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace App.IRepos{
    public interface IRepository<TEntity> where TEntity : class
    {
        void Add(TEntity entity);
        void AddRange(IEnumerable<TEntity> entity);
        void Remove(TEntity entity);
        void RemoveRange(IEnumerable<TEntity> entity);
        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate);

        int SaveChanges();
    }

}
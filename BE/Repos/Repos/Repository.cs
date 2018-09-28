using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using App.IRepos;
using App.Models;
using Microsoft.AspNetCore.Mvc;

namespace App.Repos{

    [Route("Template")]
    //public class CommentRepo : ICommentRepo {
    public class Repository<TEntity> : IRepository<TEntity> where TEntity: class{
        private readonly AppDbContext Context;
        public Repository(AppDbContext context){
            Context = context;
        }

        public void Add(TEntity entity){
            Context.Set<TEntity>().Add(entity);   
        }
        public void AddRange(IEnumerable<TEntity> entities){
            Context.Set<TEntity>().AddRange(entities);         
        }
        public void Remove(TEntity entity){
            Context.Set<TEntity>().Remove(entity);   
        }
        public void RemoveRange(IEnumerable<TEntity> entities){
            Context.Set<TEntity>().RemoveRange(entities);   
        }
        public IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate){
            return Context.Set<TEntity>().Where(predicate);
        }
        public int SaveChanges(){
            return Context.SaveChanges();
        }
    }
}
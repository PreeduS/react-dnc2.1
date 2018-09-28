using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using App.IRepos;
using App.Models;
using App.Repos;
using App.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace App.ReposMockup{

   
    public class CommentRepoMockup : Repository<Comment>, ICommentRepo{
        private readonly AppDbContext Context;
        public CommentRepoMockup(AppDbContext context) : base(context){
            Context = context;
        }
        public async Task<IEnumerable<CommentViewModel>> LoadCommentsAsync(int ThreadId){


            List<CommentViewModel> resultVModel = new List<CommentViewModel>(){
                new CommentViewModel{
                    Id = 1, Content = "Content", ReplyTo = null, GroupId = null, ThreadId = 1,
                    Replies = new List<ReplyViewModel>{
                        new ReplyViewModel{
                            Id = 2, Content = "Reply", ReplyTo = 1,  GroupId = 1, ThreadId = 1
                        },
                        new ReplyViewModel{
                            Id = 3, Content = "Reply2", ReplyTo = 2,  GroupId = 1, ThreadId = 1
                        },
                        new ReplyViewModel{
                            Id = 4, Content = "Reply3", ReplyTo = 2,  GroupId = 1, ThreadId = 1
                        }
                    }

                },
                new CommentViewModel{
                    Id = 5, Content = "Content", ReplyTo = null, GroupId = null, ThreadId = 1,
                    Replies = new List<ReplyViewModel>{
                        new ReplyViewModel{
                            Id = 6, Content = "Reply", ReplyTo = 5,  GroupId = 5, ThreadId = 1
                        },
                    }
                }
            };

            return resultVModel;




        }
        
        public async Task<IEnumerable<CommentViewModel>> LoadMoreCommentsAsync( int ThreadId, int LastId){

            List<CommentViewModel> resultVModel = new List<CommentViewModel>(){
                new CommentViewModel{
                    Id = 101, Content = "Content", ReplyTo = null, GroupId = null, ThreadId = 1,
                    Replies = new List<ReplyViewModel>{
                        new ReplyViewModel{
                            Id = 102, Content = "Reply", ReplyTo = 101,  GroupId = 1, ThreadId = 1
                        },
                        new ReplyViewModel{
                            Id = 103, Content = "Reply2", ReplyTo = 102,  GroupId = 1, ThreadId = 1
                        },
                        new ReplyViewModel{
                            Id = 104, Content = "Reply3", ReplyTo = 102,  GroupId = 1, ThreadId = 1
                        },
                        new ReplyViewModel{
                            Id = 105, Content = "Reply3", ReplyTo = 104,  GroupId = 1, ThreadId = 1
                        }
                    }

                },
                new CommentViewModel{
                    Id = 105, Content = "Content", ReplyTo = null, GroupId = null, ThreadId = 1,
                    Replies = new List<ReplyViewModel>{
                        new ReplyViewModel{
                            Id = 106, Content = "Reply", ReplyTo = 5,  GroupId = 5, ThreadId = 1
                        },
                    }
                }
            };
            

            //await Task.Delay(0);
            return resultVModel;


            
        }
        
    }



}
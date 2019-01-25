using Service.Common.ServiceResult;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Dynamic;
using System.Text;
using StoresProcedures.IStoresProcedures;
using VR.Dto;

namespace StoresProcedures.StoresProcedures
{
    public class SolicitationProcedure : ISolicitationProcedure
    {

        public ServiceResult<List<AllSolicitationSubsidyDto>> ViewSolicitationAsSupervisorProcedure(Guid Supervisor, Guid AgentId)
        {
            using (var connection = new SqlConnection(
                "Data Source=.\\SQLEXPRESS;Initial Catalog=VR;Integrated Security = True;Trusted_Connection=True;MultipleActiveResultSets=true"
            ))
            {
                connection.Open();
                var item = new List<AllSolicitationSubsidyDto>();

                using (var command = new SqlCommand("exec ViewSolicitationAsSupervisorProcedure " +
                                                    "@SupervisorId = '" + Supervisor + "' , @AgentId = '" + AgentId+"'",connection))
                {
                    using (var dataReader = command.ExecuteReader())
                    {
                        while (dataReader.Read())
                        {
                            item.Add(
                                new AllSolicitationSubsidyDto()
                                {
                                    Id = (Guid)dataReader.GetValue(0),
                                    FullName = (string)dataReader.GetValue(1),
                                    CreateDate = (DateTime)dataReader.GetValue(2),
                                    Motive = (string)dataReader.GetValue(3),
                                    Localities = (string)dataReader.GetValue(4),
                                    Total = (decimal)dataReader.GetValue(5),
                                    State = (string)dataReader.GetValue(6)
                                }
                            );
                        }

                    }
                }
                return new ServiceResult<List<AllSolicitationSubsidyDto>>(item); 
            }
        }




    }
}

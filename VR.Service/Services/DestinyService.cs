using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Data.Model.ModelStoreProcedure;
using VR.Dto;
using VR.Service.Interfaces;

namespace VR.Service.Services
{
    public class DestinyService : IDestinyService
    {
        private readonly DataContext _context;
        public DestinyService(DataContext context)
        {
            _context = context;
        }

        public ServiceResult<DestinyBaseDto> Delete(Guid id)
        {
            var destiny = _context.Destinies.FirstOrDefault(x => x.Id == id);
            if (destiny == null)
            {
                return new ServiceResult<DestinyBaseDto>(null);
            }

            _context.Destinies.Remove(destiny);
            _context.SaveChanges();
            return new ServiceResult<DestinyBaseDto>(new DestinyBaseDto());
        }


        public ServiceResult<List<Get_DestiniesResult>> Get_DestiniesProcedure(Guid solicitationId)
        {
           return new ServiceResult<List<Get_DestiniesResult>>(
               _context.Get_DestiniesProcedure(solicitationId)
               );
        }


    }
}

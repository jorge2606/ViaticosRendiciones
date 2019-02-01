using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Dto;
using VR.Service.Interfaces;

namespace VR.Service.Services
{
    public class SolicitationStateService : ISolicitationStateService
    {
        private readonly DataContext _context;

        public SolicitationStateService(
            DataContext context
        )
        {
            _context = context;
        }

        public ServiceResult<AddFielNumberDto> AddFielNumber(AddFielNumberDto fields)
        {
            var solicitationState = _context.SolicitationStates.FirstOrDefault(
                x => x.SolicitationSubsidyId == fields.SolicitationSubsidyId);

            solicitationState.FileNumber = fields.FileNumber;

            _context.SolicitationStates.Update(solicitationState);
            _context.SaveChanges();

            return new ServiceResult<AddFielNumberDto>(fields);
        }

    }
}

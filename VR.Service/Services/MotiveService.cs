using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Dto;
using VR.Service.Interfaces;

namespace VR.Service.Services
{
    public class MotiveService : IMotiveService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public MotiveService(
            DataContext context,
            IMapper mapper
        )
        {
            _context = context;
            _mapper = mapper;
        }

        public ServiceResult<List<AllMotiveDto>> GetAllMotive()
        {
            return new ServiceResult<List<AllMotiveDto>>(
                _context.Motives.Select(x => _mapper.Map<AllMotiveDto>(x)).ToList());
        }
    }
}

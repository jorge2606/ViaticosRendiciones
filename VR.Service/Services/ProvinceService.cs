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
    public class ProvinceService : IProvinceService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ProvinceService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public ServiceResult<List<AllProvinceDto>> GetAllProvince()
        {
            return new ServiceResult<List<AllProvinceDto>>(
               _context.Provinces.Select(x => _mapper.Map<AllProvinceDto>(x)).OrderBy(x=>x.Name).ToList() 
             );
        }
    }
}

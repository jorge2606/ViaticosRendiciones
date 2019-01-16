using Service.Common.ServiceResult;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using VR.Data;
using VR.Dto;
using VR.Service.Interfaces;

namespace VR.Service.Services
{
    public class CountryService : ICountryService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public CountryService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public ServiceResult<List<GetAllCountryDto>> getAllCountry()
        {
            return new ServiceResult<List<GetAllCountryDto>>(
                _context.Countries.Select(x => _mapper.Map<GetAllCountryDto>(x))
                    .OrderBy(x => x.Name)
                    .ToList()
            );
        }
    }
}

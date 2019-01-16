﻿using System;
using System.Collections.Generic;
using System.Text;
using Service.Common.ServiceResult;
using VR.Dto;

namespace VR.Service.Interfaces
{
    public interface IDestinyService
    {
        ServiceResult<DestinyBaseDto> Delete(Guid id);
    }
}

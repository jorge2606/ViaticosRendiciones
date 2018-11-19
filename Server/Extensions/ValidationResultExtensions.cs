using FluentValidation.Results;
using server.ServiceResult;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Extensions
{
    public static class ValidationResultExtensions
    {
        public static ServiceResult<TReturn> ToServiceResult<TReturn>(this ValidationResult validationResult, TReturn tReturn)
        {
            var result = new ServiceResult<TReturn>(tReturn);
            AddErrors(result, validationResult.Errors);
            return result;
        }

        private static void AddErrors(ServiceResultBase result, IEnumerable<ValidationFailure> errors)
        {
            foreach (var error in errors)
            {
                result.AddNotification(NotificationType.Error, error.ErrorMessage);
            }
        }
    }
}

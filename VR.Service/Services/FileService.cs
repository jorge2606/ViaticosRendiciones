using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using VR.Dto;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Service.Interfaces;

namespace VR.Service.Services
{
    public class FileService : IFileService
    {

        public static string StaticFilesDirectory = Path.Combine(Directory.GetCurrentDirectory(), "StaticFiles");

        private DataContext _contextFile;
        private IMapper _mapper;

        public FileService(DataContext contextFile, IMapper mapper)
        {
            _contextFile = contextFile;
            _mapper = mapper;
        }

        public async Task<ServiceResult<UpdateMyImageDto>> UpdateMyImage(UpdateMyImageDto model)
        {

            var path = Path.Combine(StaticFilesDirectory, "Profile", model.UserId.ToString());

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            var newDirectory = Path.Combine(StaticFilesDirectory, "Profile", model.UserId.ToString());
            var files = Directory.EnumerateFiles(path, "*.*" );

            
            if (files.Count() > 0)
            {
                foreach (var f in files)
                {
                    System.IO.File.Delete(f); 
                }
            }

            var file = model.File;

            using (var stream = file.OpenReadStream())
            {
                var filePath = Path.Combine(newDirectory, file.FileName);

                model.Path = filePath;
                model.MimeType = file.ContentType;

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                    
                    fileStream.Dispose();
                }
                stream.Dispose();
            }

            _contextFile.Files.Add(_mapper.Map<VR.Data.Model.File>(model));
            _contextFile.SaveChanges();
            

            return new ServiceResult<UpdateMyImageDto>(model);
        }

        public ServiceResult<FileByIdDto> GetByIdFile(Guid userId)
        {
            var path = Path.Combine(StaticFilesDirectory,"Profile",userId.ToString());
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
                System.IO.File.Copy(Path.Combine(StaticFilesDirectory, "user.png"), Path.Combine(path, "user.png"));
            }
            var files = Directory.EnumerateFiles(path, "*.*");

            FileInfo file1;

            FileByIdDto imagesPath = new FileByIdDto();

            if (files.Count() == 1)
            {
                string pathFile = "";

                foreach (var i in files)
                {
                    file1 = new FileInfo(i.ToString());
                    pathFile = file1.Name;
                }

                imagesPath.Paths = pathFile;
            }

            return new ServiceResult<FileByIdDto>(imagesPath);
        }

        public ServiceResult<FileByIdDto> GetCompletePath(Guid userId)
        {
            var path = Path.Combine(StaticFilesDirectory, "Profile", userId.ToString());

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);

                System.IO.File.Copy(Path.Combine(StaticFilesDirectory, "user.png"), Path.Combine(path, "user.png"));
            }

            FileByIdDto imagesPath = new FileByIdDto();

            var files = Directory.EnumerateFiles(path, "*.*");
     
            if (files.Count() == 1)
            {
                string pathFile = "";

                foreach (var i in files)
                {
                    pathFile = i;
                }

                imagesPath.Paths = pathFile;
            }

            return new ServiceResult<FileByIdDto>(imagesPath);
        }

        public ServiceResult<FileByIdDto> RemoveProfilePhoto(Guid userId)
        {
            var path = Path.Combine(StaticFilesDirectory, "Profile", userId.ToString());

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);

                System.IO.File.Copy(Path.Combine(StaticFilesDirectory, "user.png"), Path.Combine(path, "user.png"));
            }
            DirectoryInfo files = new DirectoryInfo(path);

            var fileSystem = files.EnumerateFileSystemInfos();

            foreach (var i in fileSystem)
            {
                File.Delete(Path.Combine(path, i.Name));
            }

            File.Copy(Path.Combine(StaticFilesDirectory, "user.png"), Path.Combine(path, "user.png"));

            FileByIdDto pathByIdDto = new FileByIdDto()
            {
                Paths = path
            };
            return new ServiceResult<FileByIdDto>(pathByIdDto);
        }


        public ServiceResult<FileByIdDto> GetCompletePathHolographSign(Guid userId)
        {
            var path = Path.Combine(StaticFilesDirectory, "HolographsSigns","Sign_"+ userId.ToString());

            FileByIdDto imagesPath = new FileByIdDto
            {
                IsDeleted = false
            };

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);

                System.IO.File.Copy(Path.Combine(StaticFilesDirectory, "sign.png"), Path.Combine(path, "sign.png"));
                imagesPath.IsDeleted = true;
            }
            
            var files = Directory.EnumerateFiles(path, "*.*");

            if (files.Count() == 1)
            {
                string pathFile = "";

                foreach (var i in files)
                {
                    pathFile = i;
                }

                if (pathFile.Equals(Path.Combine(path, "sign.png")))
                {
                    imagesPath.IsDeleted = true;
                }
                imagesPath.Paths = pathFile;
            }

            return new ServiceResult<FileByIdDto>(imagesPath);
        }

        public ServiceResult<byte[]> GetUrlExpenditureRefundFile(Guid expenditureId)
        {
            var expenditure = _contextFile.Files.FirstOrDefault(x => x.ExpenditureId == expenditureId);

            if (expenditure == null)
            {
                return new ServiceResult<byte[]>(null);
            }

            return new ServiceResult<byte[]>(expenditure.Image);

        }

        public ServiceResult<FileCreateFromRefundDto> AddExpenditureRefundImage(FileCreateFromRefundDto image)
        {
            string base64 = image.Image.Substring(image.Image.IndexOf(',') + 1);
            byte[] data = Convert.FromBase64String(base64);
            Data.Model.File newFile = new Data.Model.File()
            {
                Id = new Guid(),
                UserId = image.UserId,
                Path = image.Path,
                ExpenditureId = image.ExpenditureId,
                Image = data,
                MimeType = image.MimeType
            };
            
            _contextFile.Files.Add(newFile);
            _contextFile.SaveChanges();
            return new ServiceResult<FileCreateFromRefundDto>(
                _mapper.Map<FileCreateFromRefundDto>(image)
                );
        }


        public async Task<ServiceResult<UpdateMyImageDto>> HolographSignUpdate(UpdateMyImageDto model)
        {
            var path = Path.Combine(StaticFilesDirectory, "HolographsSigns", "Sign_"+model.UserId.ToString());
            model.IsDeleted = false;
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            var newDirectory = Path.Combine(StaticFilesDirectory, "HolographsSigns", "Sign_"+model.UserId.ToString());
            var files = Directory.EnumerateFiles(path, "*.*");

            if (files.Count() > 0)
            {
                foreach (var f in files)
                {
                    System.IO.File.Delete(f);
                }
            }

            var file = model.File;

            using (var stream = file.OpenReadStream())
            {
                var filePath = Path.Combine(newDirectory, file.FileName);

                model.Path = filePath;
                model.MimeType = file.ContentType;

                

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);

                    fileStream.Dispose();
                }
                stream.Dispose();
            }

            _contextFile.Files.Add(_mapper.Map<VR.Data.Model.File>(model));
            _contextFile.SaveChanges();


            return new ServiceResult<UpdateMyImageDto>(model);
        }

        public ServiceResult<FileByIdDto> RemoveHolographSign(Guid userId)
        {
            var path = Path.Combine(StaticFilesDirectory, "HolographsSigns", "Sign_" + userId.ToString());
            FileByIdDto pathByIdDto = new FileByIdDto();
            pathByIdDto.IsDeleted = true;

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);

                System.IO.File.Copy(Path.Combine(StaticFilesDirectory, "sign.png"), Path.Combine(path, "sign.png"));
            }
            DirectoryInfo files = new DirectoryInfo(path);

            var fileSystem = files.EnumerateFileSystemInfos();

            foreach (var i in fileSystem)
            {
                File.Delete(Path.Combine(path, i.Name));
            }

            File.Copy(Path.Combine(StaticFilesDirectory, "sign.png"), Path.Combine(path, "sign.png"));

            pathByIdDto.Paths = path;
            return new ServiceResult<FileByIdDto>(pathByIdDto);
        }

    }
}

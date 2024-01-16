package com.nyxanite.ws.file;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nyxanite.ws.configuration.NyxaniteProperties;

@Service
public class FileService {

    @Autowired
    NyxaniteProperties nyxaniteProperties;

    public String saveBase64StringAsFile(String image) {
        String fileName = UUID.randomUUID().toString();
        Path path = Paths.get(nyxaniteProperties.getStorage().getRoot(), nyxaniteProperties.getStorage().getProfile(),
                fileName);
        try {
            OutputStream outputStream = new FileOutputStream(path.toFile());
            byte[] base64encoded = Base64.getDecoder().decode(image.split(",")[1]);
            outputStream.write(base64encoded);
            outputStream.close();
            return fileName;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}

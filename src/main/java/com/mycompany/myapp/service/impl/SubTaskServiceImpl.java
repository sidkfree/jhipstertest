package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.SubTaskService;
import com.mycompany.myapp.domain.SubTask;
import com.mycompany.myapp.repository.SubTaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link SubTask}.
 */
@Service
@Transactional
public class SubTaskServiceImpl implements SubTaskService {

    private final Logger log = LoggerFactory.getLogger(SubTaskServiceImpl.class);

    private final SubTaskRepository subTaskRepository;

    public SubTaskServiceImpl(SubTaskRepository subTaskRepository) {
        this.subTaskRepository = subTaskRepository;
    }

    @Override
    public SubTask save(SubTask subTask) {
        log.debug("Request to save SubTask : {}", subTask);
        return subTaskRepository.save(subTask);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SubTask> findAll() {
        log.debug("Request to get all SubTasks");
        return subTaskRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<SubTask> findOne(Long id) {
        log.debug("Request to get SubTask : {}", id);
        return subTaskRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete SubTask : {}", id);
        subTaskRepository.deleteById(id);
    }
}
